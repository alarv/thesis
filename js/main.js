var Main = {
    Init: function() {

        /*copyright*/
        var copyright = new Date();
        var update = copyright.getFullYear();
        if ($('footer #copyright #info').length) {
            $('footer #copyright #info').html('Copyright &copy ' + update + ', All Rights Reserved');
        }

        $(".home section.slide_bar span").click(function() {
            if (parseInt($(".home section.slide_bar").css("marginRight")) != 0) {
                $(".home section.slide_bar").animate({
                    marginRight: 0,
                }, 500, function() {
				// Animation complete.
                });
            } else {
                $(".home section.slide_bar").animate({
                    marginRight: "-350px",
                }, 500, function() {
				// Animation complete.
                });
            }
        });
        
        Map.Init();
    }
};
