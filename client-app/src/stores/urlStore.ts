import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ShortURL } from "../models/urls";

export default class UrlStore {
    urlRegistry = new Map<number, ShortURL>();
    
    selectedUrl: ShortURL | undefined = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get urlsByDate() {
        return Array.from(this.urlRegistry.values()).sort((a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate));
    }

    loadUrls = async () => {
        this.loadingInitial = true;
        try {
            const urls = await agent.Url.list();
            urls.forEach(url => {
                this.setUrl(url);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadUrl = async (id: number) => {
        let url = this.getUrl(id);
        if (url) {
            this.selectedUrl = url;
            return url;
        } else {
            this.loadingInitial = true;
            try {
                url = await agent.Url.details(id);
                this.setUrl(url);
                runInAction(() => {
                    this.selectedUrl = url;
                })
                this.setLoadingInitial(false);
                return url;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setUrl = (url: ShortURL) => {
        url.createdDate = url.createdDate.split('T')[0];
        this.urlRegistry.set(url.id, url);
    }

    private getUrl = (id: number) => {
        return this.urlRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createUrl = async (url: ShortURL) => {
        this.loading = true;
        try {
            await agent.Url.create(url);
            runInAction(() => {
                this.loadUrls;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteJob = async (id: number) => {
        this.loading = true;
        try {
            await agent.Url.delete(id);
            runInAction(() => {
                this.urlRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}