# Web-component-Based-WYSIWYG

Usage:

``` HTML
<!-- Pollyfill for web components -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.14/webcomponents-lite.js"></script>

<!-- Import script for WYSIWYG -->
<script src="scripts/wysiwyg-lite.src.js"></script>

<!-- Declare the WYSIWYG and bind to oninput (like <textarea>) -->
<wysiwyg-lite
    id="your-wysiwyg" 
    oninput="console.log(event.target.value)"
></wysiwyg-lite>

<!-- Edit it's internal state live -->
<script>
    let yourWysiwyg = document.getElementById("your-wysiwyg")
    yourWysiwyg.value = "Example text"
</script>
```
