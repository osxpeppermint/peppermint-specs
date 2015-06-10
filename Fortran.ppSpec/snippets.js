ace.define("ace/snippets/fortran_modern",["require","exports","module"], function(require, exports, module) {
"use strict";

exports.snippetText = "snippet al\n\
	allocate(${1:array}, stat=${2:err})\n\
	if ($2 /= 0) print *, \"${1/(\\w+).*/$1/}: Allocation request denied\"\n\
	\n\
snippet alloc\n\
	allocate(${1:array}, stat=${2:err})\n\
	if ($2 /= 0) print *, \"${1/(\\w+).*/$1/}: Allocation request denied\"\n\
	\n\
	$0if (allocated(${1/(\\w+).*/$1/})) deallocate(${1/(\\w+).*/$1/}, stat=$2)\n\
	if ($2 /= 0) print *, \"${1/(\\w+).*/$1/}: Deallocation request denied$0\"\n\
snippet and\n\
	.and.\n\
snippet char\n\
	character(len=$1${2:, kind=$3})${4:, ${5:attributes}} :: ${6:name}\n\
snippet close\n\
	close(unit=${1:iounit}, iostat=${2:ios}${3:, status=\"delete\"})\n\
	if ( $2 /= 0 ) stop \"Error closing file unit $1\"\n\
	\n\
snippet typ\n\
	type(${1:type name})${2:, ${3:attributes}} :: ${4:name}\n\
snippet deal\n\
	if (allocated($1)) deallocate(${1:array}, stat=${2:err})\n\
	if ($2 /= 0) print *, \"$1: Deallocation request denied$0\"\n\
snippet dot\n\
	dot_product($1,$2)\n\
snippet eq\n\
	.eq.\n\
snippet eqv\n\
	.eqv.\n\
snippet gt\n\
	.gt.\n\
snippet ge\n\
	.ge.\n\
snippet ido\n\
	(${1:i}, $1 = ${2:1}, ${3:100}, ${4:1})$0\n\
snippet maxloc\n\
	maxloc(${1:source}${2:, mask=${3:($1>0)}})\n\
snippet minloc\n\
	minloc(${1:source}${2:, mask=${3:$1>0}})\n\
snippet open\n\
	open(unit=${1:iounit}, file=${2:name}, iostat=${3:ios}, status=\"${4:old}\", action=\"${5:read}\")\n\
	if ( $3 /= 0 ) stop \"Error opening file ${2/[\\\"\\'](.*)[\\\"\\']/$1/}\"\n\
	\n\
snippet inq\n\
	inquire(file=${1:filename}, opened=${2:ioopen}, exists=${3:ioexist}, number=${4:iounit})\n\
snippet inq\n\
	inquire(unit=${1:iounit}, opened=${2:ioopen}, name=${3:filename}, action=${4:ioaction})\n\
snippet int\n\
	integer${1:(${2:kind})}${3:, ${4:attributes}} :: ${5:name}\n\
snippet lt\n\
	.lt.\n\
snippet le\n\
	.le.\n\
snippet undefined\n\
	 &\n\
	\n\
snippet log\n\
	logical${1:(${2:kind})}${3:, ${4:attributes}} :: ${5:name}\n\
snippet lbound\n\
	lbound(${1:source}${2:, dim=${3:1}})\n\
snippet mat\n\
	matmul($1,$2)\n\
snippet maxval\n\
	maxval(${1:source}${2:, dim=${3:1}}${4:, mask=${5:($1>0)}})\n\
snippet minval\n\
	minval(${1:source}${2:, dim=${3:1}}${4:, mask=${5:($1>0)}})\n\
snippet neqv\n\
	.neqv.\n\
snippet not\n\
	.not.\n\
snippet open\n\
	open(unit=${1:iounit}, file=${2:name}, iostat=${3:ios}, &\n\
	     status=\"${4:old/new/replace/scratch/unknown}\", action=\"${5:read/write/readwrite}\", access=\"${7:sequential/direct}\"${7/(direct)$|.*/(?1:, recl=)/}$0)\n\
	if ( $3 /= 0 ) stop \"Error opening file ${2/[\\\"\\'](.*)[\\\"\\']/$1/}\"\n\
snippet or\n\
	.or.\n\
snippet open\n\
	open(unit=${1:iounit}, file=${2:name}, iostat=${3:ios}, status=\"${4:new}\", action=\"${5:write}\")\n\
	if ( $3 /= 0 ) stop \"Error opening file ${2/[\\\"\\'](.*)[\\\"\\']/$1/}\"\n\
	\n\
snippet prod\n\
	product(${1:source}${2:, dim=${3:1}}${4:, mask=${5:($1>0)}})\n\
snippet c\n\
	character(len=*) :: \n\
snippet t\n\
	type(${1:type name}) :: \n\
snippet i\n\
	integer :: \n\
snippet l\n\
	logical :: \n\
snippet op\n\
	open(unit=${1:iounit}, file=${2:name}, iostat=${3:ios})\n\
	if ( $3 /= 0 ) stop \"Error opening file ${2/[\\\"\\'](.*)[\\\"\\']/$1/}\"\n\
snippet re\n\
	read*, \n\
snippet r\n\
	real :: \n\
snippet wr\n\
	write(unit=${1:iounit}, fmt=*) ${0:variables}\n\
	\n\
snippet rn\n\
	call random_number($0)\n\
snippet rs\n\
	call random_seed(${1:size=${2:<int>}}${3:put=(/$4/)})\n\
snippet rea\n\
	real${1:(${2:kind})}${3:, ${4:attributes}} :: ${5:name}\n\
snippet open\n\
	open(unit=${1:iounit}, iostat=${3:ios}, status=\"${4:scratch}\", action=\"${5:readwrite}\")\n\
	if ( $3 /= 0 ) stop \"Error opening scratch file on unit $1\"\n\
	\n\
snippet size\n\
	size(${1:source}${2:, dim=${3:1}})\n\
snippet sum\n\
	sum(${1:source}${2:, dim=${3:1}}${4:, mask=${5:($1>0)}})\n\
snippet type\n\
	type ${1:type name}\n\
		$0\n\
	end type $1\n\
snippet ubound\n\
	ubound(${1:source}${2:, dim=${3:1}})\n\
snippet undefined\n\
	(/ $TM_SELECTED_TEXT$0 /)\n\
snippet F\n\
	.FALSE.\n\
snippet T\n\
	.TRUE.\n\
snippet all\n\
	all(${1:mask}${2:, dim=${3:1}})\n\
snippet any\n\
	any(${1:mask}${2:, dim=${3:1}})\n\
snippet case\n\
	case ${1:default}\n\
		$0\n\
snippet count\n\
	count(${1:mask}${2:, dim=${3:1}})\n\
snippet cy\n\
	cycle\n\
snippet data\n\
	data ${1:variable} / ${2:data} /\n\
snippet dow\n\
	do while ( ${1:condition} )\n\
		$0\n\
	end do\n\
snippet do\n\
	do${1: ${2:i} = ${3:1}, ${4:100}, ${5:1}}\n\
		$0\n\
	end do\n\
snippet elif\n\
	elseif ( ${1:condition} ) then\n\
		\n\
snippet for\n\
	forall (${1:i=1:100}${2:, mask})\n\
		$0\n\
	end forall\n\
snippet fun\n\
	function ${1:name}\n\
		${2:argument type}, intent(${3:inout}) :: ${1/\\w+\\((.*)\\)|.*/$1/}\n\
		${4:function type} :: ${1/(\\w+).*/$1/}\n\
		$0\n\
	end function ${1/(\\w+).*/$1/}\n\
snippet if\n\
	if ( ${1:condition} ) \n\
snippet if\n\
	if ( ${1:condition} ) then\n\
		$0\n\
	end if\n\
snippet imp\n\
	implicit none\n\
	\n\
snippet interf\n\
	interface ${1:name}\n\
		$0\n\
	end interface ! $1\n\
snippet max\n\
	max($1, $2${, $3:...})$0\n\
snippet merge\n\
	merge(${1:source}, ${2:alternative}, mask=(${2:$1>0}))\n\
snippet min\n\
	min($1, $2${, $3:...})$0\n\
snippet mp\n\
	module procedure ${0:name}\n\
snippet mod\n\
	module ${1:name}\n\
	\n\
		implicit none\n\
		$0\n\
	\n\
	end module $1\n\
	\n\
snippet ndo\n\
	${1:name}: do${2: ${3:i} = ${4:1}, ${5:100}, ${6:1}}\n\
		$0\n\
	end do $1\n\
snippet nsel\n\
	${1:name}: select case ($2:variable)\n\
		case ($3:values) $1\n\
			$0\n\
	end select $1\n\
snippet pack\n\
	pack(${1:array}, mask=(${2:$1>0})${3:, vector=${4:destination vector}})\n\
snippet pr\n\
	print*, \n\
snippet prog\n\
	program ${1:name}\n\
	\n\
		implicit none\n\
		$0\n\
	\n\
	end program $1\n\
	\n\
snippet read\n\
	read(unit=${1:iounit}, fmt=\"(${2:format string})\", iostat=${3:istat}, advance='NO', size=${4:number of characters}) ${5:variables}\n\
	if ( $3 /= 0 ) stop \"Read error in file unit $1\"\n\
	\n\
snippet read\n\
	read(unit=${1:iounit}, fmt=\"(${2:format string})\", iostat=${3:istat}) ${4:variables}\n\
	if ( $3 /= 0 ) stop \"Read error in file unit $1\"\n\
	\n\
snippet resh\n\
	reshape(${1:source}${2:, shape=(/$3/)}${4:, pad=(/$5/)}${6:, order=(/${7:2,1}/)})\n\
snippet sel\n\
	select case ($1:variable)\n\
		case ($2:values)\n\
			$0\n\
	end select\n\
snippet spread\n\
	spread(${1:source}, dim=${2:1}, ncopies=$3)\n\
snippet stop\n\
	stop \"${1:message}\"\n\
snippet sub\n\
	subroutine ${1:name}\n\
		${2:argument type}, intent(${3:inout}) :: ${1/\\w+\\((.*)\\)|.*/$1/}\n\
		$0\n\
	end subroutine ${1/(\\w+).*/$1/}\n\
snippet unpack\n\
	unpack(${1:vector}, mask=(${2:$1>0}), field=${3:destination array})\n\
snippet wh\n\
	where ( $1 ${2:==} $3 ) \n\
snippet whe\n\
	where ( $1 ${2:==} $3 )\n\
		$0\n\
	end where\n\
snippet write\n\
	write(unit=${1:iounit}, fmt=\"(${2:format string})\", iostat=${3:ios}${4:, advance='NO'}) ${5:variables}\n\
	if ( $3 /= 0 ) stop \"Write error in file unit $1\"\n\
	\n\
";
exports.scope = "";

});
