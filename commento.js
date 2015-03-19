$(document).ready(function() {
	var isOpen = false;
	
	var articleUrl = $("meta[name='commento:url']").attr("content");
	$.get("http://commento-server.herokuapp.com/article?articleUrl=" + encodeURIComponent(articleUrl), function(data, status) {
		// Build iframe for Commento
		var articleId = data.articleId;
		var iframeSrc = "http://commento-client.herokuapp.com/#/overview?articleId=" + articleId;
		var iframeStyle = "height:100%; width:99%;";
		var iframeHtml = "<iframe frameborder=0 src='" + iframeSrc + "' style='" + iframeStyle + "'></iframe>"
		
		// Build sliding panel
		var commentoDiv = $("#commento-embed");
		var slidingPanel = 
			"<div id='commento-slider-root' class='cd-panel from-right'>" +
				"<div id='commento-slider-subroot' class='cd-panel-container'>" +
					// Commento iframe goes here
				"</div>" +
			"</div>";
		
		// Build button to slide the panel
		var expandCommentsButton = 
			"<div id='open-commento-button' class='expand-comments'>" +
				"<div class='expand-comments-label'>" +
					"Comments" +
				"</div>" + 
			"</div>";
			
		// Add elements to the DOM and we're done!
		commentoDiv.append(slidingPanel);
		$("body").append(expandCommentsButton);
		$("#open-commento-button").click(function() {
			if (isOpen) {
				$("#commento-slider-root").removeClass("is-visible");
				$("#commento-slider-subroot").empty();
				isOpen = false;
			} else {
				$("#commento-slider-root").addClass("is-visible");
				$("#commento-slider-subroot").append(iframeHtml);
				isOpen = true;
			}
		});
	});
	
});