//Get the button
var mybutton = document.getElementById("backhomebtn");

// When the user scrolls down 300px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (window.innerHeight + window.scrollY > document.body.clientHeight-130) {
            document.getElementById('backhomebtn').style.display='none';
        }
  else if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.style.display = "block";
  }
	else {
    mybutton.style.display = "none";
  }
}
	
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

d3.csv("workinfo.csv", d3.autoType).then(data=>{
    console.log(data)

    const exrows = d3.select("#experience")
        .selectAll(".section row")
        .data(data)
        .join("div")
        .attr("class", "section row")

    exrows.each(function(d) {
        d3.select(this)
            .append("div")
            .attr("class", "leftcolumn")
    })

    d3.selectAll(".leftcolumn").each(function(d){
        const leftcolumn = d3.select(this)
            
        leftcolumn
            .append("h3")
            .text(d.Location)
        
        leftcolumn
            .append("h4")
            .attr("class", "date")
            .text(d.Dates)
    })

    exrows.each(function(d) {
        d3.select(this)
            .append("div")
            .attr("class", "rightcolumn")
    })

    d3.selectAll(".rightcolumn").each(function(d){
        const rightcolumn = d3.select(this)

        rightcolumn
            .append("h3")
            .text(d.JobTitle)
        
        rightcolumn
            .append("h4")
            .attr("class", "date")
            .text(d["Company/Position"])

        if(d.Link != null){
            rightcolumn
                .append("h5")
                .attr("class", "link")
                .append("img")
                    .attr("src", "https://img.icons8.com/ios-filled/50/000000/link.png")
                    .attr("alt", "url-link-icon")
                    .attr("class", "link")

            rightcolumn
                .select("h5.link").append("a")
                    .attr("href", d.Link)
                    .attr("target", "_blank")  
                    .text(d.Link)
        }

        rightcolumn
            .append("h5")
            .text(d.PositionType)

        rightcolumn
            .append("p")
            .append("ul")
            .each(function(d){
                jobdesc = d.Description.split(";")
                
                d3.select(this)
                    .selectAll("li")
                    .data(jobdesc)
                    .join("li")
                    .text(d=>d)
            })
    })


})

