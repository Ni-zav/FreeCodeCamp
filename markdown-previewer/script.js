// Get our main elements
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// Some cool starter content to show what markdown can do
const starterContent = `# Hey there! 👋

## Welcome to my Markdown Preview

Want to learn markdown? Here's a quick guide:

* Make text **bold** or *italic*
* Create [links](https://google.com)
* Add some \`inline code\` or code blocks:

\`\`\`javascript
// Here's a cool function
function sayHi(name) {
    return \`Hey there, ${name}!\`;
}
\`\`\`

> Need to quote something?
> Just use blockquotes!

And here's a cute cat pic:
![Cat](https://placekitten.com/200/200)
`;

// Set up marked with some nice defaults
marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: function(code) {
        return code;
    }
});

// Update the preview as you type
function showPreview() {
    let markdown = editor.value;
    let html = marked.parse(markdown);
    preview.innerHTML = html;
}

// Handle copying code blocks
function setupCodeCopy() {
    preview.addEventListener('click', e => {
        if (e.target.tagName === 'CODE') {
            navigator.clipboard.writeText(e.target.textContent);
            // Could add a toast notification here
        }
    });
}

// Start things up
function init() {
    editor.value = starterContent;
    showPreview();
    setupCodeCopy();
    
    // Update preview when typing
    editor.addEventListener('input', showPreview);
    
    // Auto-resize textarea (optional)
    editor.addEventListener('input', () => {
        editor.style.height = 'auto';
        editor.style.height = editor.scrollHeight + 'px';
    });
}

// Let's go!
init();
