import mongoose from 'mongoose';
import counter from './counter';
const Schema = mongoose.Schema;


const UserSchema = new Schema({
	userId : {type : Number, required: true,  unique: true, default : 0 },
	userName : String,
	email : String,
	mobile : String,
	status  : {type : Number, required: true, default : 0 }
},{
    timestamps: true,
    versionKey : false
});

UserSchema.pre('save', function(next) {
	var doc = this;
	counter.findByIdAndUpdate({_id : "user"}, {
		$inc : {seq : 1}
	}, function(error, counter) {
		if (error)
			return next(error);
		doc["userId"] = counter.seq;
		next();
	});
});

UserSchema.methods.toJSON = function(){
	var obj = this.toObject();
	delete obj.updatedAt;
	delete obj.createdAt;
	delete obj._id;
	return obj;
};


export default mongoose.model('User', UserSchema);