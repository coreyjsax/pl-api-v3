const formstack = require('../../controllers/util/formstack');


//GET all forms
exports.showAllForms = (req, res) => {
    return formstack.getAllForms()
    .then((data) => res.json(data))
    .catch((err) => err)
}

//GET form by id
exports.showFormById = (req, res) => {
    return formstack.getFormById(req.params.formId)
    .then((data) => res.json(data))
    .catch((err) => err)
}

//Handle submission
exports.handleSubmit = (data) => {
  //  let totalDueId = `62277012`;
 //   let totalDueValue = (parseInt(data.qty.value) * 25);
  //  data.totalDue = {totalDueId: totalDueValue};
   //  let totalDueId = `62277012`;
   
   
  
   console.log(data.field_64672703)
   
    let submit = {
        field_622766958: {
            first: data[0].value,
            last: data[1].value
        },
        field_62277008: {
            first: data[15].value,
            last: data[16].value
        }
    };
    
    data.splice(0, 2)
    data.splice(13, 2)
    
    for (var i = 0; i < data.length; i++){
        submit[`field_${data[i].fsid}`] = data[i].value
    }
    //submit.totalDue = {totalDueId: totalDueValue};
    console.log(submit)
    return submit;
}

//POST form submission
exports.postToFormById = (req, res) => {
    let data = req.body
    let formId = req.params.formId
    console.log(data)
    return formstack.postFormById(req.params.formId, data)
    .then((data) => res.json(data))
    .catch((err) => err) 
}

exports.test = (req, res) => {
    let order = exports.handleSubmit(req.body);
    console.log(order)
    res.json(order)
}