# Web-component-Based-WYSIWYG

Usage:

``` HTML
<wysiwyg-lite
    id="your-wysiwyg" 
    oninput="console.log(event.target.value)"
></wysiwyg-lite>

<script>
    let yourWysiwyg = document.getElementById("your-wysiwyg")
    yourWysiwyg.value = "Example text"
</script>
```
