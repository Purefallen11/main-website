import express from "express"
import fetch from "node-fetch"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
const express = require("express")
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors({
    origin: "http://127.0.0.1:5500"
}));


app.get("/pokemon", async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: "Please provide a name" })
    }
    
    try {
        const apiUrl = `${process.env.POKEAPI_URL}${name}/`;
        const response = await fetch(apiUrl)

        if (!response.ok) {
            return res.status(response.status).json({ error: "failed to fetch information" })
        }

        const data = await response.json();

        const sprite = data.sprites.front_default;
        
        res.json({name: data.name, sprite})
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
});

app.get("/pokemon/random", async (req, res) => {
    const { id } = req.query

    if (!id) {
        return res.status(400).json({ error: "please provide an id for random pokemom" })
    }
    
    try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(apiUrl)

        if (!response.ok) {
            return res.status(response.status).json({ error: "random pokemon not found" })
        }

        const data = await response.json();

        res.json(data)
    }
    catch (error) {
        console.error("Error fetching pokemon", error);
        res.status(500).json({error: "Internal Server Error"})
    }
})

app.listen(PORT, () => {
    console.log(`Serve is running on http://localhost:${PORT}`);
})