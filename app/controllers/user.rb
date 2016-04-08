get '/users/new' do
  erb :'users/new'
end


post '/users/new' do
  @user = User.new(params[:user], password: params[:password])

  if @user.save
    session[:user_id] = @user.id
    redirect '/games'
  else
    @errors = @user.errors.full_messages
    erb :'users/show'
  end
end

get '/users/:id' do
  @user = User.find(params[:id])
  erb :'users/show'
end
