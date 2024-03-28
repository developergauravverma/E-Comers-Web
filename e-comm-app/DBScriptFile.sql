USE [master]
GO
/****** Object:  Database [ECOMMDB]    Script Date: 28-03-2024 17:51:32 ******/
CREATE DATABASE [ECOMMDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ECOMMDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\ECOMMDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ECOMMDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\ECOMMDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ECOMMDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ECOMMDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ECOMMDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ECOMMDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ECOMMDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ECOMMDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ECOMMDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [ECOMMDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ECOMMDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ECOMMDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ECOMMDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ECOMMDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ECOMMDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ECOMMDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ECOMMDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ECOMMDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ECOMMDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ECOMMDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ECOMMDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ECOMMDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ECOMMDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ECOMMDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ECOMMDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ECOMMDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ECOMMDB] SET RECOVERY FULL 
GO
ALTER DATABASE [ECOMMDB] SET  MULTI_USER 
GO
ALTER DATABASE [ECOMMDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ECOMMDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ECOMMDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ECOMMDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ECOMMDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ECOMMDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'ECOMMDB', N'ON'
GO
ALTER DATABASE [ECOMMDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [ECOMMDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [ECOMMDB]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 28-03-2024 17:51:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NULL,
	[Email] [nvarchar](500) NULL,
	[Password] [nvarchar](100) NULL,
	[SaltPassword] [nvarchar](500) NULL,
	[Address] [nvarchar](200) NULL,
	[Phone] [nvarchar](50) NULL,
	[Role] [int] NULL,
	[IsActive] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[Answer] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Name], [Email], [Password], [SaltPassword], [Address], [Phone], [Role], [IsActive], [CreatedDate], [Answer]) VALUES (1, N'gaurav', N'gaurav@com1', N'123456', N'$2b$10$3AXM5ITh0deai6d/7q04z.S6VT03RlaDE64m3KCp9RVf9o.OS9wdm', N'modinagar', N'9874563210', 0, 1, CAST(N'2024-03-28T17:39:18.273' AS DateTime), N'goli')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ('') FOR [Answer]
GO
/****** Object:  StoredProcedure [dbo].[sp_ChangeUserPassword]    Script Date: 28-03-2024 17:51:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   procedure [dbo].[sp_ChangeUserPassword]
	@password nvarchar(200),
	@saltPassword nvarchar(500),
	@userId int
as
begin
declare @isUpdate bit = 0;
	update Users set [Password] = @password, SaltPassword = @saltPassword where Id=@userId
	IF (@@ROWCOUNT > 0)
	BEGIN
		  set @isUpdate = 1
	END
	select @isUpdate as isUpdate
end
GO
/****** Object:  StoredProcedure [dbo].[sp_createNewUser]    Script Date: 28-03-2024 17:51:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create    procedure [dbo].[sp_createNewUser]  
 @name nvarchar(200),  
 @email nvarchar(500),  
 @password nvarchar(100),  
 @saltpassword nvarchar(500),  
 @address nvarchar(200),  
 @phone nvarchar(50),  
 @role int,
 @answer nvarchar(200)
as   
begin  
 declare @userId int =0   
 insert into Users ([Name],Email,[Password],SaltPassword,[Address],[Role], IsActive, Phone, Answer) values  
 (@name,@email,@password,@saltpassword, @address, @role,1, @phone,@answer)  
  
 set @userId = SCOPE_IDENTITY();  
  
 select * from Users where Id = @userId  
end
GO
/****** Object:  StoredProcedure [dbo].[sp_FindUserByEmail]    Script Date: 28-03-2024 17:51:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create   procedure [dbo].[sp_FindUserByEmail]
	@email nvarchar(500)
as
begin
	declare @isExists bit = 0;
	if exists (select 1 from Users where Email = @email)
	begin
	 set @isExists = 1
	end

	select @isExists as isEmailExists
end
GO
/****** Object:  StoredProcedure [dbo].[sp_getUserByEmailId]    Script Date: 28-03-2024 17:51:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create   procedure [dbo].[sp_getUserByEmailId]
	@email nvarchar(200) = '',
	@id int = 0
as
begin
	if(@email <> '' and @id = 0)
	begin
		select * from Users where Email = @email
	end
	else
	begin
		select * from Users where Id = @id
	end
end
GO
USE [master]
GO
ALTER DATABASE [ECOMMDB] SET  READ_WRITE 
GO
