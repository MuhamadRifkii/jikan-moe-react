import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Details() {
    const { id } = useParams()
    const [anime, setAnime] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // using Fetch
    // useEffect(() => {
    //     const fetchAnime = async () => {
    //         try {
    //             const response = await fetch(
    //                 `https://api.jikan.moe/v4/anime/${id}`,
    //             )
    //             if (!response.ok)
    //                 throw new Error('Error fetching anime details')
    //             const data = await response.json()
    //             setAnime(data.data)
    //         } catch (err) {
    //             setError(err.message)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchAnime()
    // }, [id])

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await axios.get(
                    `https://api.jikan.moe/v4/anime/${id}`,
                )
                setAnime(response.data.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchAnime()
    }, [id])

    if (loading) return null
    if (error) return <p>Error: {error}</p>

    document.title = anime.title_english || anime.title

    return (
        <div className="content-container">
            <div className="detail-card">
                <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title_english}
                    className="detail-image"
                />
                <div className="anime-details">
                    <h2 className="detail-title">
                        {anime.title_english} ({anime.title_japanese})
                    </h2>
                    <p className="detail-synopsis">{anime.synopsis}</p>
                    <div className="detail-info">
                        <p>
                            <strong>Status:</strong> {anime.status}
                        </p>
                        <p>
                            <strong>Released:</strong> {anime.aired.string}
                        </p>
                        <p>
                            <strong>Genres:</strong>{' '}
                            {anime.genres
                                .map((genre) => genre.name)
                                .join(', ') || 'N/A'}
                        </p>
                        <p>
                            <strong>Studio:</strong>{' '}
                            {anime.studios
                                .map((studio) => studio.name)
                                .join(', ')}
                        </p>
                        <p>
                            {anime.season ? (
                                <>
                                    <strong>Season:</strong> {anime.season}
                                </>
                            ) : (
                                <>
                                    <strong>Type:</strong> {anime.type || 'N/A'}
                                </>
                            )}
                        </p>
                        <p>
                            <strong>Episodes:</strong> {anime.episodes}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
