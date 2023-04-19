import mongoose, { Document, Model, Schema } from "mongoose";

interface MusicAttrs {
  nameMusic: string;
  singer: string;
}

interface MusicDoc extends Document {
  nameMusic: string;
  singer: string;
}

interface MusicModel extends Model<MusicDoc> {
  build(attrs: MusicAttrs): MusicDoc;
}

const musicSchema = new Schema<MusicDoc, MusicModel>({
  nameMusic: String,
  singer: String,
});

musicSchema.statics.build = (attrs: MusicAttrs) => {
  return new Music(attrs);
};

const Music = mongoose.model<MusicDoc, MusicModel>("Music", musicSchema);

export { MusicAttrs, MusicDoc, MusicModel, Music };
