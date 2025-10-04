app.get("/api/donors", async (req, res) => {
  const { bloodGroup, city } = req.query;
  let query = {};

  if (bloodGroup) query.bloodGroup = bloodGroup;
  if (city) query.city = { $regex: new RegExp(city, "i") }; // case-insensitive search

  const donors = await Donor.find(query);
  res.json(donors);
});
