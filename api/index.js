const mongoose = require("mongoose");

class ResponseExistsError extends Error {
  constructor(args) {
    super(args);
    this.name = "ResponseExistsError";
  }
}

class DatabaseError extends Error {
  constructor(args) {
    super(args);
    this.name = "DatabaseError";
  }
}

module.exports = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    throw new DatabaseError("Error connecting to the database");
  }

  const responseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    totalScore: Number,
  });

  const Response = mongoose.model("Response", responseSchema);

  try {
    const { name, email, mobile } = req.body;

    const existingResponse = await Response.findOne({ email });

    if (existingResponse) {
      throw new ResponseExistsError(
        "Response for this email has already been recorded"
      );
    }

    let totalScore = 0;

    for (let i = 1; i <= 12; i++) {
      totalScore += parseInt(req.body[`q${i}`]);
    }

    const response = await Response.create({
      name,
      email,
      mobile,
      totalScore,
    });

    res.status(200).json({
      totalScore,
    });
  } catch (err) {
    if (err instanceof ResponseExistsError) {
      res.status(409).send(err.name);
    } else if (err instanceof DatabaseError) {
      res.status(500).send(err.name);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};
