// Get the input element with the id "search"
const input = document.getElementById("search");

// Get the datalist element with the id "blog-result"
const datalist = document.getElementById("blog-result");

// Add an event listener for the "keyup" event on the input
input.addEventListener("keyup", async function() {

    // Clear the HTML content of the datalist element
    datalist.innerHTML = "";

    // Get the value entered in the search input
    const search = this.value;

    // Fetch data from the server based on the search value
    const result = await (await fetch(`/blog/findBlogByMultifield?search=${search}`)).json();

    // Loop through the result and create a list item for each blog
    for (const blog of result) {
        // Create a new list item element
        const item = document.createElement("li");

        // Set the innerHTML of the list item to the blog title
        item.innerHTML = blog._source.title;

        // Create line break, small, and strong elements for better formatting
        const br = document.createElement("br");
        const small = document.createElement("small");
        const strong = document.createElement("strong");

        // Set the innerHTML of the small element to the blog text
        small.innerHTML = blog._source.text;

        // Set the innerHTML of the strong element to the blog author
        strong.innerHTML = blog._source.author;

        // Append line breaks, small, and strong elements to the list item
        item.appendChild(br);
        item.appendChild(br);
        item.appendChild(small);
        item.appendChild(br);
        item.appendChild(strong);

        // Append the list item to the datalist element
        datalist.appendChild(item);
    }
});
