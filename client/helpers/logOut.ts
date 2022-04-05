import {NextRouter} from "next/router";

export function logOut(router: NextRouter) {
  localStorage.clear()
  router.push('/login')
}