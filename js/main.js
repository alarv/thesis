var Main = {
    Init: function () {
    	
    	/*copyright*/
        var copyright=new Date();
        var update=copyright.getFullYear();
        if ($('footer #copyright #info').length){ 
        	$('footer #copyright #info').html('Copyright &copy ' + update + ', All Rights Reserved');
        }
    }
};

