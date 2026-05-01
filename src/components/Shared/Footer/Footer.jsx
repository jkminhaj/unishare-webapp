import { FiGithub, FiMail, FiMessageSquare } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className=" bg-[#1d2733]">
            <div className="w-11/12 md:w-10/12  mx-auto py-4 flex flex-col sm:flex-row
                            items-center justify-center gap-3">

                {/* <div className="flex items-center gap-1">
                    <span className="text-[13px] font-extrabold text-[#2399f0]">Uni</span>
                    <span className="text-[13px] font-extrabold text-[#dce8f0]">Share</span>
                    <span className="text-white/10 mx-2">|</span>
                    <span className="text-[11px] text-slate-600">© {new Date().getFullYear()}</span>
                </div> */}

                <div className="flex items-center gap-1 border-t border-white/[.04] pt-3">
                    <a href="https://github.com/jkminhaj/unishare-webapp" target="_blank" rel="noreferrer"
                       className="flex items-center gap-[6px] text-[11px] text-slate-600
                                  hover:text-[#dce8f0b7] transition-colors duration-150
                                  px-3 py-[5px] rounded-lg  no-underline">
                        <FiGithub className="text-[13px]" />
                        Star on GitHub
                    </a>

                    <span className="text-slate-600 select-none">|</span>

                    <a href="mailto:mmminhaj221@gmail.com"
                       className="flex items-center gap-[6px] text-[11px] text-slate-600
                                  hover:text-[#dce8f0b7]  transition-colors duration-150
                                  px-3 py-[5px] rounded-lg  no-underline">
                        <FiMessageSquare className="text-[13px]" />
                        Feedback
                    </a>

                    {/* <span className="text-slate-600 select-none">|</span>

                    <a href="mailto:mmminhaj221@gmail.com"
                       className="flex items-center gap-[6px] text-[11px] text-slate-600
                                   transition-colors duration-150
                                  px-3 py-[5px] rounded-lg hover:bg-white/[.04] no-underline">
                        <FiMail className="text-[13px]" />
                        Contact Developer
                    </a> */}
                </div>

            </div>
        </footer>
    );
};

export default Footer;
