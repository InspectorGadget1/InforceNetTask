import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { AboutDescription } from "../models/about";

export default class AboutStore {
    description: AboutDescription = {
        id: 1,
        description : ""
    }
    constructor() {
        makeAutoObservable(this)
    }

    getDescription = async () => {
        try {
            const description = await agent.About.get();
            runInAction(() => this.description = description)
        } catch (error) {
            console.log(error);
        }
    }
    updateDescription = async (aboutDescription: AboutDescription) => {
        try {
            await agent.About.update(aboutDescription);
            runInAction(() => {
                this.description.id = aboutDescription.id;
                this.description.description = aboutDescription.description;
            })
        } catch (error) {
            console.log(error);
        }
    }
}