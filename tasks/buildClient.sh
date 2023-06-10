GREEN=$'\e[0;32m'
echo ""
echo "${GREEN}Running build script in /client${NC}"
cd client
npm run build
echo ""
ls -la build
echo "${GREEN}Moving build files into node app: /server/public${NC}"
# rm -rf ../server/public
# mkdir ../server/public
cp -rv ./build/* ../server/public/