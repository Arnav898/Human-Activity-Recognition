import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div className="flex items-center cursor-pointer">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SoftwareChasers</span>
            </Link>
          </div>
    );
};

export default Logo;
