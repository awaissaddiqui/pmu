import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
    const { pathname } = useLocation(); // Detects route changes

    useEffect(() => {
        window.scrollTo(0, 0, { behavior: 'smooth' }); // Scrolls to the top of the page
    }, [pathname]); // Runs when pathname changes

    return null; // This component doesn't render anything
};

export default ScrollToTop;
