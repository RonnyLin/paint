class jsonParse {
    constructor() {}
    parse(obj){
        if(obj === undefined) return {};
        try{
            return JSON.parse(obj);
        }catch(error){
            return {}
        }
    }
}
export default new jsonParse();