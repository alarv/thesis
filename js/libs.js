Main.Libs = {
    ValidateEmail : function( email ){
         return /^[^\W][\-a-zA-Z0-9_]+(\.[\-a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/.test( email );
    },
    CheckIfEmpty : function( param ){
        if( param == "" ){
            return true;
        }
        else {
            if ( param.replace(/ /g,'') == "" ){
                return true;
            }
        return false;
            
        }
    },
    ValidateName : function( name ){
        return  /^[a-zA-Zα-ωΑ-Ω, άέήίόύώ]+$/.test( name );
    }
};
