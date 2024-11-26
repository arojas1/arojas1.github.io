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
};
	
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// Autofill experience on homepage
d3.csv("/data/workinfo.csv", d3.autoType).then(data=>{
    // console.log(data.filter(d => d.Show === "Y"))

    workdata = data.filter(d => d.Show === "Y")

    const exrows = d3.select("#experience")
        .selectAll(".section row")
        .data(workdata)
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
            .attr("class", "company")
            .text(d["Company/Position"])
        
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
            .attr("class", "jobtitle")
            .text(d.JobTitle)
        
        rightcolumn
            .append("h4")
            .attr("class", "location")
            .text(d.Location)

        if(d.URL != null){
            rightcolumn
                .append("h5")
                .attr("class", "link")
                .append("img")
                    .attr("src", "https://img.icons8.com/ios-filled/50/000000/link.png")
                    .attr("alt", "url-link-icon")
                    .attr("class", "link")

            rightcolumn
                .select("h5.link").append("a")
                    .attr("href", d.URL)
                    .attr("target", "_blank")  
                    .text(d.LinkName)
        }

        rightcolumn
            .append("h5")
            .text(d.PositionType)

        rightcolumn
            .append("p")
            .attr("class", "jobdescr")
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


});

// Autofill education on homepage
d3.csv("/data/educationinfo.csv", d3.autoType).then(data=>{
    educationdata = data.filter(d => d.Type === "Education")

    console.log(educationdata.filter(d => d.Level === "Undergrad"))

    d3.select("#highschool")
        .selectAll("#highschool div.education")
        .data(educationdata.filter(d => d.Level === "High School"))
        .join("div")
        .attr("class", "education")
        .each(function(d){
           d3.select(this)
            .append("h4")
            .attr("class", "school")
            .text(d.College)            
        })
        .each(function(d){
            d3.select(this)
                .append("h5")
                .attr("class", "location")
                .text(d.Location)
        })
        .each(function(d){
            d3.select(this)
                .append("h5")
                .attr("class", "dates")
                .text(d.Dates)
        })
    
    d3.select("#postsecondary")
        .selectAll("#postsecondary div.education")
        .data(educationdata.filter(d => d.Level === "Undergrad"))
        .join("div")
        .attr("class", "education")
        .each(function(d){
           d3.select(this)
            .append("h4")
            .attr("class", "school")
            .text(d.College)            
        })
        .each(function(d){
            d3.select(this)
                .append("h5")
                .attr("class", "location")
                .text(d.Location)
        })
        .each(function(d){
            d3.select(this)
                .append("h5")
                .attr("class", "dates")
                .text(d.Dates)
        })
        .each(function(d){
            d3.select(this)
                .append("p")
                .attr("class", "descr")
                .text(d.Description)
        })

    d3.select("#postgraduate")
        .selectAll("#postgraduate div.education")
        .data(educationdata.filter(d => d.Level === "Graduate"))
        .join("div")
        .attr("class", "education")
        .each(function(d){
           d3.select(this)
            .append("h4")
            .attr("class", "school")
            .text(d.College)            
        })
        .each(function(d){
            d3.select(this)
                .append("h5")
                .attr("class", "location")
                .text(d.Location)
        })
        .each(function(d){
            d3.select(this)
                .append("h5")
                .attr("class", "dates")
                .text(d.Dates)
        })
        .each(function(d){
            d3.select(this)
                .append("p")
                .attr("class", "descr")
                .text(d.Description)
        })
});

// Autofill experience on pdfpage1
d3.csv("/data/resumepages.csv", d3.autoType).then(pdfdata=>{
    // console.log(pdfdata.filter(d => (d.Resume === "Y") && (d.Page === 1)))

    pg1filtered = pdfdata.filter(d => (d.Resume === "Y") && (d.Page === 1))

    const pdfexrows = d3.select("#pdfexperiencepg1")
        .selectAll(".pdfjob1")
        .data(pg1filtered)
        .join("div")
        .attr("class", "pdfjob1")

    d3.selectAll(".pdfjob1").each(function(d){
        const pdfjob = d3.select(this)

        pdfjob
            .append("h3")
            .attr("class", "pdftitle1")
            .text(d.JobTitle + " - " + d["Company/Position"])

        pdfjob
            .append("h3")
            .attr("class", "pdflocation1")
            .text(d.Location)

        pdfjob
            .append("h3")
            .attr("class", "pdfdates1")
            .text(d.Dates)

        if(d.Descr==="Y"){
            pdfjob
                .append("p")
                .attr("class", "pdfjobdescr1")
                .append("ul")
                .attr("class", "pdfdescrlist1")
                .each(function(d){
                    pdfjobdesc = d.Description.split(";")

                    d3.select(this)
                        .selectAll("li")
                        .data(pdfjobdesc)
                        .join("li")
                        .text(d=>d)
                        .attr("class", "pdflistitem1")
                })
        }
        else{
            pdfjob
                .append("br")
        }
    })
});

// Autofill experience on pdfpage2
d3.csv("/data/resumepages.csv", d3.autoType).then(pdfdata=>{
    // console.log(pdfdata.filter(d => (d.Resume === "Y") && (d.Page === 2)))

    pg2filtered = pdfdata.filter(d => (d.Resume === "Y") && (d.Page === 2))

    const pdfexrows = d3.select("#pdfexperiencepg2")
        .selectAll(".pdfjob2")
        .data(pg2filtered)
        .join("div")
        .attr("class", "pdfjob2")

    d3.selectAll(".pdfjob2").each(function(d){

        if(d.JobTitle === null){
            const pdfjob = d3.select(this)
            
            pdfjob
                .append("p")
                .attr("class", "pdfjobdescr2")
                .append("ul")
                .attr("class", "pdfdescrlist2")
                .each(function(d){
                    pdfjobdesc = d.Description.split(";")

                    d3.select(this)
                        .selectAll(".pdflistitem2")
                        .data(pdfjobdesc)
                        .join("li")
                        .text(d=>d)
                        .attr("class", "pdflistitem2")
            })
        }
        else{
            pdfjob = d3.select(this)
            
            pdfjob
                .append("h3")
                .attr("class", "pdftitle2")
                .text(d.JobTitle + " - " + d["Company/Position"])

            pdfjob
                .append("h3")
                .attr("class", "pdflocation2")
                .text(d.Location)

            pdfjob
                .append("h3")
                .attr("class", "pdfdates2")
                .text(d.Dates)

            if(d.Descr==="Y"){
               pdfjob
                .append("p")
                .attr("class", "pdfjobdescr2")
                .append("ul")
                .attr("class", "pdfdescrlist2")
                .each(function(d){
                    pdfjobdesc = d.Description.split(";")

                    d3.select(this)
                        .selectAll(".pdflistitem2")
                        .data(pdfjobdesc)
                        .join("li")
                        .text(d=>d)
                        .attr("class", "pdflistitem2")
                }) 
            }
            else{
                pdfjob
                    .append("br")
            }
            
        } 
    })
});

// Autofill Education on pdf
d3.csv("/data/educationinfo.csv", d3.autoType).then(pdfdata=>{
    // console.log(pdfdata.filter(d => (d.Show === "Y" && d.Type === "Honors")))

    pdfedudata = pdfdata.filter(d => (d.Show === "Y" && d.Type === "Education"))
    pdfhonorsdata = pdfdata.filter(d => (d.Show === "Y" && d.Type === "Honors"))

    const pdfeducation = d3.select('#pdfeducation')
        
    pdfeducation
        .selectAll(".pdfdegree")
        .data(pdfedudata)
        .join("div")
        .attr("class", "pdfdegree")
        
        d3.selectAll(".pdfdegree")
            .each(function(d){
                d3.select(this)
                    .append("h3")
                    .attr("class", "pdfedtitle")
                    .text(d=>d.College + " - " + d.Location)

                d3.select(this)
                    .append("h3")
                    .attr("class", "pdfeddates")
                    .text(d=>d.Dates)
                
                d3.select(this)
                    .append("p")
                    .attr("class", "pdfedudescr")
                    .text(d=>d.Description)
            })

    pdfeducation
        .append("h4")
        .attr("class", "pdfhonorsheader")
        .text("Honors")

    pdfeducation
        .selectAll(".pdfhonors")
        .data(pdfhonorsdata)
        .join("div")
        .attr("class", "pdfhonors")

        d3.selectAll(".pdfhonors")
            .each(function(d){
                d3.select(this)
                    .append("h3")
                    .attr("class", "pdfedtitle")
                    .text(d=>d.College + " - " + d.Location)

                d3.select(this)
                    .append("h3")
                    .attr("class", "pdfeddates")
                    .text(d=>d.Dates)
            })
});

// Autofill skills on pdf
d3.csv("/data/skillsinfo.csv", d3.autoType).then(pdfdata=>{
    // console.log(pdfdata.filter(d => (d.Show === "Y" && d.SkillType === "Software")))

    softwarefiltered = pdfdata.filter(d => (d.Show === "Y" && d.SkillType === "Software"))

    const pdfskills = d3.select("#pdfskills")
        .append("div")
        .attr("class", "pdfskills")
        .append("ul")
        .attr("class", "pdfskillslist")
            
        d3.selectAll(".pdfskillslist")
            .data(softwarefiltered)
            .each(function(d){
                d3.select(this)
                    .selectAll("pdfsoftwarelistitem")
                    .data(softwarefiltered)
                    .join("li")
                    .text(d=>d.SkillShortDescr)
                    .attr("class", "pdfsoftwarelistitem")
            })

    // console.log(pdfdata.filter(d=> (d.SkillType=== "Programming" )))

    programmingfiltered = pdfdata.filter(d=> (d.SkillType=== "Programming" ))

    d3.selectAll(".pdfskillslist")
        .append("li")
        .attr("class", "pdfprograminglistitem")
        .data(programmingfiltered)
        .each(function(d){
            d3.select(this)
                .text(function(d){
                    progitem = (d.SkillShortDescr).replace(/;/g, ",")
                    return progitem
                })
        })
        
    languagesfiltered = pdfdata.filter(d=> (d.SkillType=== "Languages" ))

    d3.selectAll(".pdfskillslist")
        .append("li")
        .attr("class", "pdflanguageslistitem")
        .data(languagesfiltered)
        .each(function(d){
            d3.select(this)
                .text(function(d){
                    langitem = (d.SkillShortDescr).replace(/;/g, ",")
                    return langitem
                })
        })
});

// Autofill projects on pdf
d3.csv("/data/projectsinfo.csv", d3.autoType).then(pdfdata=>{
    projectsfiltered = pdfdata.filter(d => (d.Show === "Y"))

    // console.log(projectsfiltered)

    const pdfskills = d3.select("#pdfprojects")
        .append("div")
        .attr("class", "pdfprojects")
        .append("ul")
        .attr("class", "pdfprojectslist")

        d3.selectAll(".pdfprojectslist")
            .data(projectsfiltered)
            .each(function(d){
                d3.select(this)
                    .selectAll("pdfsoftwarelistitem")
                    .data(projectsfiltered)
                    .join("li")
                    .text(function(d){
                        return d["Project Title"] + " (" + d.Date + ")"
                    })
                    .attr("class", "pdfsoftwarelistitem")
            })
});

