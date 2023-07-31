const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel) {
    super(model);
    this.commentModel =commentModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  // adding a new sighting
  addNewSightings = async (req, res) => {
    const sighting = req.body;
    console.log(req.body);
    const sightingTotal = await this.model.create({
      ...sighting,
    });
    console.log(sightingTotal);
    const sendBack = await this.model.findAll();
    res.json({ sighting: sendBack, message: "Success" });
  };

  //Delete a sighting.
  deleteSighting = async (req, res) => {
    const deleteId = req.params.id;
    await this.model.destroy({
      where: {
        id: deleteId,
      },
    });
    const sendBack = await this.model.findAll();
    res.json({ sighting: sendBack, message: `Deleted ${deleteId}` });
  };
  // Edit a sighting.
  editSighting = async (req, res) => {
    const editId = req.params.id;
    await this.model.update(
      {
        date: req.body.date,
        location: req.body.location,
        notes: req.body.notes,
      },
      {
        where: {
          id: editId,
        },
      }
    );
    const sendBack = await this.model.findAll();
    res.json({ sighting: sendBack, message: `Deleted ${editId}` });
  };

  // Retrive all comments for specifc sighting
  getComments = async (req,res) =>{
    const {sightingId} =req.params;
    try{
      const comments =await this.commentModel.findAll({
        where:{
          sightingId:sightingId,
        }
      })
      return res.json(comments);
    }catch (err){
      return res.status(400).json({error:true, msg:err})
    }
  }
  // Create comment for specific sighting
  insertOneComment = async (req,res)=>{
    const {sightingId} =req.params;
    const {content} =req.body;
    try{
      const newComment = await this.commentModel.create({
        content:content,
        sightingId: sightingId,
      });
      return res.json(newComment);
    } catch(err) {
      return res.status(400).json({error: true, msg:err}) 
    }
  }

}

module.exports = SightingsController;
