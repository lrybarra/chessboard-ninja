get '/' do
  erb :index
end

get '/login' do
  @user = User.find_by(username: params[:username])
  if @user.authenticate
    session[:user_id] = @user.id
  end
end

get '/session' do
  session.inspect
end

