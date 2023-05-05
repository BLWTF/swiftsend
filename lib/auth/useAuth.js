import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"

export default function useAuth({
	redirectTo = '',
	redirectIfFound = false,
} = {}) {
	const router = useRouter()
	const { data: auth, mutate: mutateAuth, isValidating: isLoadingAuth } = useSWR("/api/auth/user")

	useEffect(() => {
		if (!redirectTo || !auth) return

		if (
			(redirectTo && !redirectIfFound && !auth?.isLoggedIn) ||
			(redirectIfFound && auth?.isLoggedIn)
		) {
			router.push(redirectTo)
		}
	}, [auth, redirectIfFound, redirectTo, router])

	return { auth, mutateAuth, isLoadingAuth }
}