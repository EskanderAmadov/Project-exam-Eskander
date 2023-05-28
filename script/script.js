const carousel = document.getElementById("carousel");
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modalImg");
const closeModalBtn = document.getElementById("closeModalBtn");

fetch("https://amadovs.no/wp-json/wp/v2/posts?per_page=12&_embed")
  .then((response) => response.json())
  .then((data) => {
    const sortedPosts = data.sort((a, b) => {
      return new Date(b.date_gmt) - new Date(a.date_gmt);
    });

    sortedPosts.forEach((post) => {
      const title = post.title.rendered;
      const date = new Date(post.date).toLocaleDateString();
      const featuredMedia = post._embedded && post._embedded["wp:featuredmedia"];
      const featuredImage = featuredMedia && featuredMedia[0] && featuredMedia[0].source_url;

      const postElement = document.createElement("div");
      postElement.classList.add("blog-post-wrapper");

      const titleElement = document.createElement("div");
      titleElement.classList.add("title");
      titleElement.textContent = title;

      const dateContainer = document.createElement("div");
      dateContainer.classList.add("date-container");

      const smallElement = document.createElement("small");
      smallElement.classList.add("small-text");
      smallElement.innerHTML = "<b>Last Updated:</b>";

      const dateElement = document.createElement("div");
      dateElement.classList.add("date");
      dateElement.textContent = date;

      dateContainer.appendChild(smallElement);
      dateContainer.appendChild(dateElement);

      if (featuredImage) {
        const imageElement = document.createElement("img");
        imageElement.classList.add("featured-image");
        imageElement.src = featuredImage;
        imageElement.alt = title;
        imageElement.addEventListener("click", function () {
          modal.style.display = "block";
          modalImg.src = this.src;
        });
        postElement.appendChild(imageElement);
      }

      postElement.appendChild(titleElement);
      postElement.appendChild(dateContainer);

      const readMoreButton = document.createElement("button");
      readMoreButton.textContent = "Read More";
      readMoreButton.addEventListener("click", () => {
        localStorage.setItem("selectedPostId", post.id);
        window.location.href = "./pages/specific.html";
      });
      postElement.appendChild(readMoreButton);

      carousel.appendChild(postElement);
    });

    initCarousel();
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });

const initCarousel = () => {
  let currentIndex = 0;
  const posts = Array.from(carousel.getElementsByClassName("blog-post-wrapper"));
  const numPosts = posts.length;
  const itemsPerView = 4;

  const navigateCarousel = () => {
    posts.forEach((post, index) => {
      if ((index >= currentIndex && index < currentIndex + itemsPerView) || (index + numPosts >= currentIndex && index + numPosts < currentIndex + itemsPerView)) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });
  };

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - itemsPerView + numPosts) % numPosts;
    navigateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + itemsPerView) % numPosts;
    navigateCarousel();
  });

  navigateCarousel();
};

closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});
