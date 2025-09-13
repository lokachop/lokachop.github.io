/* this is some of the worst code i've written i should be shot and killed for this */
var currType = document.querySelector("meta[property='pagetype']").getAttribute("content");

const btnList = [
	{dst: "/index.html"            , pagetype: "index"   , text: "Index"   },
	{dst: "/about.html"            , pagetype: "about"   , text: "About"   },
	{dst: "/projects/projects.html", pagetype: "projects", text: "Projects"},
	{dst: "/blog/blog.html"        , pagetype: "blog"    , text: "Blog"    },
	{dst: "/tools/tools.html"      , pagetype: "tools"   , text: "Tools"   },
];

/* append all of the nav buttons */
for(var i = 0; i < btnList.length; i++) {
	btnData = btnList[i];

	var btnBuild = document.createElement("a");
	btnBuild.href = btnData.dst;
	btnBuild.textContent = btnData.text;

	if(btnData.pagetype == currType) {
		btnBuild.className = "active";
	};

	document.currentScript.appendChild(btnBuild);
}