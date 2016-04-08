get '/' do
  erb :index
end

get '/login' do
  erb :login
end

post '/login' do
  puts params[:user1name]
  puts params[:user2name]
  @user1 = User.find_by(username: params[:user1name])
  @user2 = User.find_by(username: params[:user2name])
  puts @user1
  puts @user2
  if @user1.authenticate(params[:user1pword]) && @user2.authenticate(params[:user2pword])
    session[:user1_id] = @user1.id
    session[:user2_id] = @user2.id
    redirect '/games'
  end
end

get '/logout' do
  session.clear
  redirect '/'
end


get '/session' do
  session.inspect
end



