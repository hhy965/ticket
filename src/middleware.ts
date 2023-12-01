import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
    async afterAuth(auth, req, res) {
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({returnBackUrl: req.url});
        }

        const result = await fetch(process.env.API_ADDRESS + "/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: auth.userId,
            }),
        })

        await result.json();
    }
});
 
export const config = {
  matcher: ['/'],
};
 