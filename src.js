function index() {
    // The script automatically creates the Index of the document

    let toc = document.querySelector("#TOC");
    if (!toc) {
        toc = document.createElement("div");
        toc.id = "TOC";
        document.body.prepend(toc);
    };
    headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

    let sectionNumbers = [ 0, 0, 0, 0, 0, 0 ];  // current section number counter

    for (let heading of headings) { // go through the entire array with headings

        // we can place links in the headings to return to the beginning of the document
        let a = document.createElement("a");
        a.href = "#";
        a.style = "text-decoration:none";
        heading.before(a);
        a.append(heading);

        if (heading.parentNode === toc) continue;  // if the title is in the Index - skip

        let level = parseInt(heading.tagName.charAt(1));  // level = the level of the html-header

        sectionNumbers[ level - 1 ]++; // html-header of its level increases the number of this level in the counter by one

        for (let i = level; i < 6; i++) { sectionNumbers[ i ] = 0; };  // fill the remaining counter cells with zeros

        // the current header number consists of the level digits of the current counter, separated by dots
        let sectionNumber = sectionNumbers.slice(0, level).join(".");

        let span = document.createElement("span");  // create span class="TOCSectNum">
        span.className = "TOCSectNum";
        span.innerHTML = sectionNumber;             // with the current heading number
        heading.prepend(span); // place it before the content of the current heading, it turns out to be numbered

        let anchor = document.createElement("a");   // create tag <a name="TOC1.1">
        anchor.name = "TOC" + sectionNumber;
        heading.before(anchor);                     // insert before the current heading
        anchor.append(heading);                     // moving the title inside this <a> tag, we get an anchor

        let link = document.createElement("a");  // create tag <a>
        link.href = "#TOC" + sectionNumber;      // assign it a href like <a href="#TOC1.1">
        link.innerHTML = heading.innerHTML;      // inside it - the contents of the current title, a link to the anchor is obtained

        let entry = document.createElement("div");      // create tag <div>
        entry.className = "TOCEntry TOCLevel" + level;  // assign it a class like <div class="TOCEntry TOCLevel1">
        entry.append(link);                             // inside it - a link to the anchor. The result is the Contents line.

        toc.append(entry);    // place the created Content line into the Content tag
    };
};
index();