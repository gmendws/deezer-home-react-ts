import mongoose, { Document, Model, Schema } from "mongoose";

interface MusicAttrs {
  name: string;
  singer: string;
}

interface MusicDoc extends Document {
  name: string;
  singer: string;
}

interface MusicModel extends Model<MusicDoc> {
  build(attrs: MusicAttrs): MusicDoc;
}

const musicSchema = new Schema<MusicDoc, MusicModel>({
  name: String,
  singer: String,
});

musicSchema.statics.build = (attrs: MusicAttrs) => {
  return new Music(attrs);
};

const Music = mongoose.model<MusicDoc, MusicModel>("Music", musicSchema);

export { MusicAttrs, MusicDoc, MusicModel, Music };
