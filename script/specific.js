const postContainer = document.getElementById("postContainerInfo");

window.onload = function () {
  const postId = localStorage.getItem("selectedPostId");
  fetchSpecificPost(postId);
};

function fetchSpecificPost(id) {
  fetch(`https://amadovs.no/wp-json/wp/v2/posts/${id}?_embed`)
    .then((response) => response.json())
    .then((post) => renderPost(post))
    .catch((err) => console.log("Error:", err));
}

function renderPost(post) {
  document.title = "IM Travel Blog | " + post.title.rendered;
  const title = post.title.rendered;
  const date = new Date(post.date).toLocaleDateString();
  const content = post.content.rendered;
  const featuredMedia = post._embedded && post._embedded["wp:featuredmedia"];
  const featuredImage = featuredMedia && featuredMedia[0] && featuredMedia[0].source_url;

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;
  postContainer.appendChild(titleElement);

  if (featuredImage) {
    const imageAnchor = document.createElement("a");
    imageAnchor.href = "#";
    imageAnchor.addEventListener("click", function () {
      openModal(featuredImage);
    });

    const imageElement = document.createElement("img");
    imageElement.src = featuredImage;
    imageElement.alt = title;

    imageAnchor.appendChild(imageElement);
    postContainer.appendChild(imageAnchor);
  }

  const dateElement = document.createElement("p");
  dateElement.textContent = `Last Updated: ${date}`;
  postContainer.appendChild(dateElement);

  const contentElement = document.createElement("div");
  contentElement.innerHTML = content;
  postContainer.appendChild(contentElement);
}

function openModal(imageUrl) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const imageElement = document.createElement("img");
  imageElement.src = imageUrl;
  imageElement.alt = "Modal Image";
  modalContent.appendChild(imageElement);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
}

function closeModal(modal) {
  document.body.removeChild(modal);
}
