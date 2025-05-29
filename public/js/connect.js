const form = document.getElementById("urlForm");
const input = document.getElementById("originalUrl");
const historyDiv = document.getElementById("urlHistory");
const clearBtn = document.getElementById("clearBtn");
const shortUrlResult = document.getElementById("shortUrlResult");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = input.value.trim();

  if (!url) return;

  try {
    const response = await fetch("/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    const fullShortUrl = `${window.location.origin}/${data.shortId}`;

    // Show the latest short URL and QR code
    shortUrlResult.innerHTML = `
      <div class="alert alert-success animate__animated animate__fadeIn">
        <p><strong>Short URL:</strong> <a href="${fullShortUrl}" target="_blank">${fullShortUrl}</a></p>
        <button class="btn btn-outline-secondary btn-sm mb-2" onclick="navigator.clipboard.writeText('${fullShortUrl}')">
          📋 Copy to Clipboard
        </button>
        <div class="mt-3">
          <p class="mb-1"><strong>Scan QR Code:</strong></p>
          <img src="${data.qrCode}" alt="QR Code" class="img-thumbnail" style="max-width: 200px;" />
        </div>
      </div>
    `;

    // Add to history above result
    historyDiv.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="card result-box shadow-sm mt-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <span><strong>Short URL:</strong> <a href="${fullShortUrl}" target="_blank">${fullShortUrl}</a></span>
          <button class="btn btn-outline-primary btn-sm" onclick="navigator.clipboard.writeText('${fullShortUrl}')">Copy</button>
        </div>
      </div>
    `
    );

    input.value = "";
  } catch (err) {
    alert("Failed to shorten URL. Try again.");
  }
});

clearBtn.addEventListener("click", () => {
  historyDiv.innerHTML = "";
  shortUrlResult.innerHTML = "";
});
