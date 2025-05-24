document.getElementById('urlForm').addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const url = document.getElementById('originalUrl').value;

    const res = await fetch('/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
    });

    const data = await res.json();
    const shortUrl = `${window.location.origin}/${data.shortId}`;

    document.getElementById('shortUrlResult').innerHTML = `
        <div class="alert alert-success">
            Short URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a>
        </div>
    `;
});
