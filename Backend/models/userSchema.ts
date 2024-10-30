import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    console.log("pre save");
    
    if (this.isModified("password") || this.isNew) {
        console.log("Hashing password for user:", this.email); // Debugging line
        const hashedPassword = await bcrypt.hash(this.password, 10);
        console.log(hashedPassword)
        this.password = hashedPassword;
    }
    next();
});


export default mongoose.model("User", userSchema);
