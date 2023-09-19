/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

const Dashboard = ( ) => {
  const { user, logoutUser } = useAuth();
  const [movieList, setMovieList] = useState([])

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar,setIsNewMovieOscar] = useState(false)


  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("")

  const moviesCollectionRef = collection(db, "movies")

    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setMovieList(filteredData)
      } catch (error) {
        console.log(error)
      }
    }
    getMovieList()

  useEffect(() => {
    getMovieList()
  }, [])


  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle, 
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
      })

      getMovieList()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title: updatedTitle})
  }
  
  
  return (
    <div>
      <header>
        <h1>Dashboard </h1>
        <h2>Name : {user.displayName}</h2>
        <h2>Email : {user.email}</h2>
        <button onClick={logoutUser}>Log out</button>
      </header>

      <main>
        <h1>Movies</h1>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input  
              placeholder="new Title..." 
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </main>

      <main>
        <h1>Create movie</h1>
        <div>
           <input 
              placeholder="Movie title..." 
              type="text"
              onChange={(e) => setNewMovieTitle(e.target.value)}
            />
           <input 
              placeholder="Release Date..." 
              type="number" 
              onChange={(e) => setNewReleaseDate(Number(e.target.value))}
            />
           <input 
              type="checkbox" 
              checked={isNewMovieOscar}
              onChange={(e) => setIsNewMovieOscar(e.target.checked)}
            />
           <label>Recieved an Oscar</label>
           <button onClick={onSubmitMovie}>Submit Movie</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;