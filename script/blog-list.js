const postContainer = document.getElementById("postContainer");
const loadMoreButton = document.getElementById("loadMoreButton");

let currentPage = 1;
const postsPerPage = 10;

window.onload = function () {
  loadPosts(currentPage);
};

function loadPosts(page) {
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;

  const spinner = document.getElementById("spinner");
  spinner.classList.remove("hidden");

  fetch(`https://amadovs.no/wp-json/wp/v2/posts?_embed&per_page=${end}`)
    .then((response) => response.json())
    .then((posts) => {
      renderPosts(posts);

      if (posts.length > postsPerPage) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
      }

      spinner.classList.add("hidden");
    })
    .catch((err) => console.log("Error:", err));
}

function renderPosts(posts) {
  postContainer.innerHTML = "";

  posts.forEach((post) => {
    const title = post.title.rendered;
    const featuredMedia = post._embedded && post._embedded["wp:featuredmedia"];
    const featuredImage = featuredMedia && featuredMedia[0] && featuredMedia[0].source_url;

    const postCard = document.createElement("div");
    postCard.classList.add("blog-post-card");

    if (featuredImage) {
      const imageElement = document.createElement("img");
      imageElement.classList.add("featured-image");
      imageElement.src = featuredImage;
      imageElement.alt = title;
      postCard.appendChild(imageElement);
    }

    const titleElement = document.createElement("h2");
    titleElement.classList.add("title");
    titleElement.textContent = title;
    postCard.appendChild(titleElement);

    const readMoreButton = document.createElement("button");
    readMoreButton.textContent = "Read More";
    readMoreButton.addEventListener("click", () => {
      localStorage.setItem("selectedPostId", post.id);
      window.location.href = "../pages/specific.html";
    });
    postCard.appendChild(readMoreButton);

    postContainer.appendChild(postCard);
  });
}

function showLoadMoreButton() {
  loadMoreButton.style.display = "block";
}

function hideLoadMoreButton() {
  loadMoreButton.style.display = "block";
}

loadMoreButton.addEventListener("click", function () {
  currentPage++;
  loadPosts(currentPage);
});
