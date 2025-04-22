const params = new URLSearchParams(window.location.search);
const query = params.get("q");

const input = document.getElementById("search-input");
if (input) input.value = query || "";

fetch("/index.json")
  .then(res => res.json())
  .then(pages => {
    const resultsContainer = document.getElementById("search-results");

    if (!query) {
      resultsContainer.innerHTML = "<p>Please enter a search query.</p>";
      return;
    }

    const fuse = new Fuse(pages, {
      keys: ["title", "summary"],
      includeScore: true,
      threshold: 0.3,
    });

    const results = fuse.search(query);

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    resultsContainer.innerHTML = results
      .map(({ item }) => `
        <div>
          <a href="${item.permalink}" class="text-lg font-semibold text-blue-600 hover:underline">${item.title}</a>
          <p class="text-sm text-gray-600">${item.summary}</p>
        </div>
      `)
      .join("");
  });
