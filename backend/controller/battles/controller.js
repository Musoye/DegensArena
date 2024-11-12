const expressAsyncHandler = require("express-async-handler");
const {
  processMongoDBObject: format,
  reverseProcessMongoDBObject: reformat,
} = require("../../utils/formatter.js");
const Token = require("../../models/tokenModel.js");
const Battle = require("../../models/battleModel.js");

const createBattle = expressAsyncHandler(async (req, res) => {
  const { contender_id, creator_id } =
    req.body;
  if (!contender_id || !creator_id ) {
    return res.status(400).json({ error: "No contender_id, creator_id  in the request body",});
  }
  if (contender_id == creator_id) {
    return res.status(400).json({ error: "Contender and creator cannot be the same" });
  }
  const status = "live";
  const creator = await Token.findOne({ contract_address: creator_id });
  if (!creator) {
    return res.status(404).json({ error: "Creator not found" });
  }
  const contender = await Token.findOne({ contract_address: contender_id });
  if (!contender) {
    return res.status(404).json({ error: "Contender not found" });
  }
  const battle = await Battle.create({
    creator_id,
    creator_name: creator.name,
    creator_img: creator.image_url,
    contender_id,
    contender_name: contender.name,
    contender_img: contender.image_url,
    status,
  });
  return res.status(201).json(format(battle));
});

const battleStatus = async (query) => {
  const response = await Battle.find({ status: query });
  const value = [];
  for (let resa of response) {
    value.push(format(resa));
  }
  return {battles: value}
}

const getBattleLive = expressAsyncHandler(async (req, res) => {
  const result = await battleStatus('live');
  return res.status(200).json(result);
})

const getBattlePast = expressAsyncHandler(async (req, res) => {
  const result = await battleStatus('past');
  return res.status(200).json(result);
})

const getBattles = expressAsyncHandler(async (req, res) => {
  const query = req.query.query || "";
  let response = [];
  if (query == "live" || query == "past" || query == "future") {
    response = await Battle.find({ status: query });
  } else {
    response = await Battle.find();
  }
  const value = [];
  for (let resa of response) {
    value.push(format(resa));
  }
  return res.status(200).json({ battles: value });
});

const getBattle = expressAsyncHandler(async (req, res) => {
  const battle = await Battle.findById(req.params.id);
  if (!battle) {
    return res.status(404).json({ error: "The Battle cannot be found" });
  }
  return res.status(200).json(format(battle));
});

const updateBattle = expressAsyncHandler(async (req, res) => {
  const battle = await Battle.findById(req.params.id);
  if (!battle) {
    return res.status(400).json({ error: "Battle not found" });
  }
  const { contender_id, contender_img, contender_name, status } = req.body;
  if (contender_id) {
    battle.contender_id = contender_id;
  }
  if (contender_name) {
    battle.contender_name = contender_name;
  };
  if (contender_img) {
    battle.contender_img = contender_img;
  }
  if (creator_img) {
    battle.creator_img = creator_img;
  }
  if (status) {
    battle.status = status;
  }
  await battle.save();
  return res.status(200).json(format(battle));
});

module.exports = {createBattle, getBattles, getBattle, updateBattle, getBattleLive, getBattlePast};