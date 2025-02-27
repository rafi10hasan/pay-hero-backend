const bcrypt = require("bcrypt");

async function testBcrypt() {
  try {
    const hash = await bcrypt.hash("43221", 10);
    console.log("Hashed PIN:", hash);
  } catch (error) {
    console.error("bcrypt error:", error);
  }
}

testBcrypt();
