import { createContext, useContext } from "react"
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import UrlStore from "./urlStore";
import AboutStore from "./aboutStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    urlStore: UrlStore;
    aboutStore: AboutStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    urlStore: new UrlStore(),
    aboutStore: new AboutStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}