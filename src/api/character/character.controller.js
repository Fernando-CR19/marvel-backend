import { Unathorized } from "../../utils/http-error/http-error"
import { fetchMarvelApi } from "../../fetchMarvelApi"

import { Character } from "./character.model"

export const list = async (req, res, next) => {
    try {
        const response = await fetchMarvelApi("/characters");
        const data = await response.json();

        const ids = data.data.results.map((Character) => String(Character.id));
        const favorites = await Character.batchGet(ids);

        data.data.results = data.data.results.map((Character) => ({
            ...Character,
            favorite: favorites.some(
                (favorite) => String(favorite.id) === String(Character.id)
            ),
        }));

        res.json(data);

    } catch (err) {
        console.log(err);
        next(err);
    };
};

export const favorite = async (req, res, next) => {
    try {
        const characters = await Character.get(req.params.id);

        if (!Character) {
            await Character.create({ id: String(req.params.id) });
        }

        res.sendStatus(204);

    } catch (err) {
        console.log(err);
        next(err);
    };
};

export const unfavorite = async (req, res, next) => {
    try {
        const Characters = await Characters.get(req.params.id);

        await Character.delete(String(req.params.id));

        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        next(err)
    }
};
