import mongoose from 'mongoose';

var movieSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: 'This field is required'
        },
        description: {
            type: String,
            required: 'This field is required'
        },
        image: {
            type: String,
            required: 'This field is required'
        },
        rating: {
            type: Number,
        },
        summary: {
            type: String,
        }
    },
    { timestamps: true }
);



const Movie = mongoose.model('Movie', movieSchema);
export default Movie;