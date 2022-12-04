source_files=./build/*
temp_dir=/tmp/jonathansamson.com-build
target_dir=/home/webmaster/jonathansamson.com

# npm run build

# clear and recreate $temp_dir
mkdir -p $temp_dir

# copy to $temp_dir
cp -a ./build/. $temp_dir

echo $temp_dir
echo $target_dir

# clear $target_dir
sudo -u webmaster rm -r $target_dir
# make $target_dir
sudo -u webmaster mkdir -p $target_dir
# copy to $target_dir
sudo -u webmaster cp -a $temp_dir/. $target_dir/

# cleanup
rm -r $temp_dir