export default class checkpassword{
    static checkPassword(name,minlength){
        if( name.length<minlength ){
            return false;

        }
        return true;

    }
}