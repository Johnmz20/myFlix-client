import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie view/movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "28 Weeks Later",
            description: "Six months after the rage virus was inflicted on the population of Great Britain, the US Army helps to secure a small area of London for the survivors to repopulate and start again. But not everything goes according to plan.",
            genre: {
                name:"Horror",
                description:"fiction that is intended to disturb, frighten or scare. Horror is often divided into the sub-genres of psychological horror and supernatural horror, which are in the realm of speculative fiction."
                    },
            director:{
                name:"Matt Reeves",
                bio:"Matt Reeves is an American film director, producer, and screenwriter. He first gained recognition for the WB drama series Felicity, which he co-created with J. J. Abrams. Reeves came to widespread attention for directing the hit monster film Cloverfield.",
                birth:"1966"},
                image:"https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51w2zJbuwOL._AC_UF894,1000_QL80_.jpg"
        },
        {
            id: 2,
            title: "Skinamarink",
            description:"Two children wake up in the middle of the night to find their father is missing, and all the windows and doors in their home have vanished.",
            genre:{
                name:"Horror",
                description:"fiction that is intended to disturb, frighten or scare. Horror is often divided into the sub-genres of psychological horror and supernatural horror, wich are in the realm of speculative fiction"
              },
            director:{
                name:"Kyle Edward Bell",
                  bio:"Kyle Edward Ball is a Canadian filmmaker, best known for writing and directing the experimental horror film Skinamarink.",
                    birth:"1985"
               },
               image:"https://variety.com/wp-content/uploads/2022/12/Skinamarink-Horizontal.png?w=681&h=383&crop=1&resize=450%2C253"
        },
        {
            id: 3,
            title:"The Poughkeepsie Tapes",
            description:"In an abandoned house in Poughkeepsie, New York murder investigators uncover hundreds of tapes showing decades of a serial killer's work.",
            genre:{
                name:"Thriller",
                description:"fiction with numerous, often overlapping, subgenres, including crime, horror and detective fiction. Thrillers are characterized and defined by the moods they elicit, giving their audiences heightened feelings of suspense, excitement, surprise, anticipation and anxiet."
            },
            director:{
                name:"John Erick Dowdle",
                bio:"John grew up in the Twin Cities of Minnesota. After graduating St. Thomas Academy, an all-boys, military, Catholic highschool, John moved to Iowa City to attend the University of Iowa. There he would make the move from writing to film. Two years later, John moved to Manhattan to attend NYU's film program. After graduating NYU, John moved to Los Angeles to pursue a career in filmmaking. John wrote and directed his first feature, Full Moon Rising (1996) just out of college. For his sophomore effort, The Dry Spell, John was joined by his brother Drew, who produced the film as John wrote, directed and edited. They now live in Los Angeles, working together as The Brothers Dowdle.",
                birth:"1972"
            },
            image:"https://m.media-amazon.com/images/M/MV5BMTQ5OTA3NzA2N15BMl5BanBnXkFtZTcwODk2MDc0MQ@@._V1_.jpg"
        }
    ]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    if(selectedMovie) {
        return (
            <MovieView
            movie={selectedMovie}
            onBackClick={()=> setSelectedMovie(null)}
            />
        );
    }

    if (movies.length === 0) {
        return <div> this list is empty!</div>;
    }

    return(
        <div>
            {movies.map((movie)=> (
                <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie)=> {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
};