import mongoose, { Document, Model, Schema } from "mongoose";

interface UserAttrs {
  name: string;
  email: string;
  password: string;
}

interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new Schema<UserDoc, UserModel>({
  name: String,
  email: String,
  password: String,
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { UserAttrs, UserDoc, UserModel, User };
