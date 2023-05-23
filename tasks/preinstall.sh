GREEN=$'\e[0;32m'
echo "${GREEN}Running preinstall script${NC}"
echo ""
echo "${GREEN}Installing modules in client directory${NC}"
cd client && npm i
echo ""
echo "${GREEN}Installing modules in server directory${NC}"
cd ..
cd server && npm i
echo ""
cd ..
