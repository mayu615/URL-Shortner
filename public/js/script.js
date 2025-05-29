const form = document.getElementById("urlForm");
const input = document.getElementById("originalUrl");
const historyDiv = document.getElementById("urlHistory");
const clearBtn = document.getElementById("clearBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = input.value;

  try {
    const response = await fetch("/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error("Failed to shorten URL");
    }

    const data = await response.json();
    const fullShortUrl = `${window.location.origin}/${data.shortId}`;

    const resultHTML = `
      <div class="card result-box shadow-sm mt-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <span><strong>Short URL:</strong> <a href="${fullShortUrl}" target="_blank">${fullShortUrl}</a></span>
          <button class="btn btn-outline-primary btn-sm" onclick="copyToClipboard('${fullShortUrl}')">Copy</button>
        </div>
      </div>
    `;

    historyDiv.insertAdjacentHTML("afterbegin", resultHTML);
    input.value = "";
  } catch (error) {
    alert(error.message);
  }
});

clearBtn.addEventListener("click", () => {
  historyDiv.innerHTML = "";
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}
